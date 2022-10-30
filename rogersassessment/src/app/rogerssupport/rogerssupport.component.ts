import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { WebsiteInformation, Entry, Item } from '../models/WebsiteInformation';
import { SeoInformation } from "../models/SeoInformation";
import { CustomPageTemplateGQL, AllPageTemplateGQL, PageTemplateCollection, PageTemplate } from "../generated/graphql";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-graphql',
  templateUrl: './rogerssupport.component.html',
  styleUrls: ['./rogerssupport.component.css']
})
export class RogersSupportComponent implements OnInit {

  // Can be moved to a common constant file or use angular constant concept
  private ROGERS_REST_API_SERVER = "https://cdn.contentful.com/spaces/8utyj17y1gom/entries?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37&content_type=pageTemplate&include=1&fields.url=%2Fhome%2Fsupport";

  items: Item[] = []
  entries: Entry[] = []
  customPageCollection: PageTemplateCollection | null | undefined;
  allPageCollection: PageTemplateCollection | null | undefined;
  itemsData: SeoInformation[] = [];

  // Mocked pagenation functionality, in reality, the data will be indexed in the services
  // based on the data obtained from the api
  data: SeoInformation[] | undefined;
  pageEvent: PageEvent | undefined;

  constructor(private dataService: DataService, private customPageTemplateGQL: CustomPageTemplateGQL, private allPageTemplateGQL: AllPageTemplateGQL) {}

  ngOnInit(): void {
    this.dataService.getWebsiteData(this.ROGERS_REST_API_SERVER).subscribe((data)=>{
      const websiteInformation = data as WebsiteInformation;
      this.items = websiteInformation.items;
      this.entries = websiteInformation.includes.Entry;
    });

    this.customPageTemplateGQL.fetch({ "include": 1, "url": "/home/support" }).subscribe(({ data }) => {
      this.customPageCollection = data.pageTemplateCollection;
    });

    this.allPageTemplateGQL.fetch().subscribe(({ data }) => {
      this.allPageCollection = data.pageTemplateCollection as PageTemplateCollection;
      if(this.allPageCollection) {
        const itemData = this.allPageCollection.items as PageTemplate[];
        if(itemData) {
          for(let item of itemData) {
            const urlparts: Array<string> | undefined = item.url?.split("/");
            let url = "https://www.rogers.com/";
            if(urlparts) {
              let size = urlparts.length;
              url = url + urlparts[size - 1];
            }
            const title = item.seo?.title?.replace("| Rogers", "- Rogers");
            const description = item.seo?.description?.substring(0, 80);
            const isNoIndex = item.seo?.isNoIndex ?? false;
            // Unable to find the category data based on the query.
            // Need some help on this.
            const category = "Support - Wireless";
            const entry: SeoInformation = {
              url: url,
              title: title,
              description: description,
              isNoIndex: isNoIndex,
              category: category
            };
            this.itemsData.push(entry);
          }
          this.data = this.itemsData.slice(0, 10);
        }
      }
    });
  }

  onPaginateChange(event: PageEvent) {
    event.pageIndex = event.pageIndex + 1;
    this.data = this.itemsData?.slice(event.pageIndex, event.pageIndex + event.pageSize);
  }

  navigate(title: String | undefined) {
    // Next page navigation can be written here
    // this.router.navigateByUrl('rogers-support-entries/' + title);
  }  
}

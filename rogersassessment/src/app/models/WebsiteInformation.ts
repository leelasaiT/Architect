export interface WebsiteInformation {
    sys:      SysInformation;
    total:    number;
    skip:     number;
    limit:    number;
    items:    Item[];
    includes: Includes;
}

export interface Includes {
    Entry: Entry[];
}

export interface Entry {
    metadata: Metadata;
    sys:      EntrySys;
    fields:   EntryFields;
}

export interface EntryFields {
    entryTitle:   string;
    title?:       string;
    description?: string;
    isNoIndex?:   boolean;
    alert?:       SEO;
    hero?:        SEO[];
    body?:        SEO[];
}

export interface SEO {
    sys: SEOSys;
}

export interface SEOSys {
    type:     PurpleType;
    linkType: LinkTypeEnum;
    id:       string;
}

export enum LinkTypeEnum {
    ContentType = "ContentType",
    Entry = "Entry",
    Environment = "Environment",
    Space = "Space",
}

export enum PurpleType {
    Link = "Link",
}

export interface Metadata {
    tags: any[];
}

export interface EntrySys {
    space:       SEO;
    id:          string;
    type:        LinkTypeEnum;
    createdAt:   Date;
    updatedAt:   Date;
    environment: SEO;
    revision:    number;
    contentType: SEO;
    locale:      string;
}

export interface Item {
    metadata: Metadata;
    sys:      EntrySys;
    fields:   ItemFields;
}

export interface ItemFields {
    url:                  string;
    isShowVaButton:       boolean;
    seo:                  SEO;
    template:             SEO;
    onsiteSearchIndexing: string[];
}

export interface SysInformation {
    type: string;
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.css']
})
export class TriangleComponent implements OnInit {

  pattern : string[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    let rows = 4; // Considering rows as the height of the triangle
    for (let i = 1; i <= rows; i++) {
      let output = "";
      for (let k = 0; k < i; k++) {
        output += "*";
      }
      for (let j = 0; j < rows - i; j++) {
        output += " ";
      }
      // Each row of the triangle is pushed to the pattern array
      this.pattern.push(output);
    }

    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    if (canvas && canvas.getContext){
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
      ctx?.moveTo(75,75);
      ctx?.lineTo(10,75);
      ctx?.lineTo(10,25);
      ctx?.fill();
    }
  }


}

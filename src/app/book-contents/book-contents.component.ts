import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-book-contents',
  templateUrl: './book-contents.component.html',
  styleUrls: ['./book-contents.component.css']
})
export class BookContentsComponent implements AfterViewInit {

  @ViewChild('viewer') viewerRef: ElementRef;
  url: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {this.url = params.url;})
   }

   ngAfterViewInit(): void {

    let fullUrl = 'https://e-library-application.herokuapp.com/' + this.url;

    WebViewer({
      path: '../assets/lib',
      initialDoc: fullUrl,
    }, this.viewerRef.nativeElement).then(instance => {

        const {documentViewer, annotationManager} = instance.Core;

        documentViewer.addEventListener('documentLoaded', async () => {
          const doc = documentViewer.getDocument();
          const xfdfString = await annotationManager.exportAnnotations();
          const options = { xfdfString };
          const data = await doc.getFileData(options);
          const arr = new Uint8Array(data);
          const blob = new Blob([arr], { type: 'application/pdf' });
          const date = new Date();
        });

      });
  }

  ngOnInit(): void {
  }

}

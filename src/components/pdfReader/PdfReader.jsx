import { Paginator } from 'primereact/paginator';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/* 
  exemplo da chamada do componente(em public): 
  <PdfReader document={'http://localhost:3000/nomedopdf.pdf'} />
*/

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfReader({ document }) {
  const [numPages, setNumPages] = useState();
  const [first, setFirst] = useState(0);

  console.log(first);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  return (
    <div>
      <Document file={document} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={first + 1} />
      </Document>

      <Paginator first={first} rows={1} totalRecords={numPages} onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />

    </div>
  );
}
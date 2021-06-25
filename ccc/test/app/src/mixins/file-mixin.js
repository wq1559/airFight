import txtImgUrl from '../assets/img/file-icons/txt.png';
import docImgUrl from '../assets/img/file-icons/doc.png';
import pptImgUrl from '../assets/img/file-icons/ppt.png';
import pdfImgUrl from '../assets/img/file-icons/pdf.png';
import xlsImgUrl from '../assets/img/file-icons/xls.png';
import zipImgUrl from '../assets/img/file-icons/zip.png';
import fileImgUrl from '../assets/img/file-icons/file.png';

export default {
  data() {
    return {
      txtImgUrl: txtImgUrl,
      docImgUrl: docImgUrl,
      pptImgUrl: pptImgUrl,
      pdfImgUrl: pdfImgUrl,
      xlsImgUr: xlsImgUrl,
      zipImgUrl: zipImgUrl,
      fileImgUrl: fileImgUrl
    }
  },
  methods: {
    getFileTypeImage(type) {
      if (type === 'txt') {
        return this.txtImgUrl;
      } else if (type === 'docx' || type === 'doc') {
        return this.docImgUrl;
      } else if (type === 'pptx' || type === 'ppt') {
        return this.pptImgUrl;
      } else if (type === 'pdf') {
        return this.pdfImgUrl;
      } else if (type === 'xls' || type === 'xlsx') {
        return this.xlsImgUr;
      } else if (type === 'zip') {
        return this.zipImgUrl;
      } else {
        return this.fileImgUrl;
      }
    },
  }
}

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { uploadFile } from "App/Services/uploadFile.service";

const RichEditor = ({ value, onChange }) => {
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) =>
            uploadFile(file).then((imgUrl) => resolve({ default: imgUrl }))
          );
        });
      },
    };
  };
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: [
          "imageUpload",
         
          "heading",
          "|",
          "bold",
          "italic",
          "bulletedList",
          "numberedList",
          "|",
          "undo",
          "redo",
        ],
        extraPlugins: [uploadPlugin],
      }}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (onChange) {
          onChange(data);
        }
      }}
      onReady={(editor) => {}}
      onBlur={(event, editor) => {}}
      onFocus={(event, editor) => {}}
    />
  );
};

export default RichEditor;

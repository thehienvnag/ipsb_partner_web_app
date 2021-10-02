import React, { useState } from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const TestCkeditorPage = () => {

  return (
    <PageWrapper className="coupon-page">
      <PageBody noWrap>
        <Col flex="auto">
          <Card className="card-table">
            <div style={{width: 650, marginLeft: 150}}>
              <h2>Using CKEditor 5 build in React</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command.
                    uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                  },
                  //plugins: [ CKFinder],
                  // toolbar: [ 'ckfinder', 'imageUpload', '|', 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo' ]
                }
                }
                data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </div>
          </Card>
        </Col>
      </PageBody>
    </PageWrapper>
  );
};

export default TestCkeditorPage;

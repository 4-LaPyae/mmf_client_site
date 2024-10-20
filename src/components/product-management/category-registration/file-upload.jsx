import { useState } from "react";
import { Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
const FileUpload = ({ onFileChange, setErrorStatus, setMsg, buttonText }) => {
    // State to manage the list of uploaded files
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    // Function to handle file upload before processing
    const beforeUpload = (file) => {
        // List of accepted file formats
        const acceptedFormats = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif",
        ];

        // Check if the file format is accepted
        const isAcceptedFormat = acceptedFormats.includes(file.type);

        // Display an error message if the format is not accepted
        if (!isAcceptedFormat) {
            setErrorStatus(true);
            setMsg(
                `${file.name} is not a valid file format. Please upload a PNG, JPG, JPEG, or GIF file.`,
            );

            // Scroll to the top of the page for better visibility of the error
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }

        // Return false to prevent automatic upload of the file and ignore it in the file list
        return isAcceptedFormat ? false : Upload.LIST_IGNORE;
    };

    // Function to handle file changes
    const handleChange = ({ fileList }) => {
        // Update the state with the new file list
        setFileList(fileList);

        // Pass the fileList to the parent component or form
        onFileChange(fileList);
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };

    return (
        <div>
            {/* Upload component with specified configurations */}
            <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
                accept="image/png, image/jpg, image/jpeg, image/gif"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {/* Button trigger for file upload */}
                <Button icon={<UploadOutlined />}>{buttonText}</Button>
            </Upload>
            {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
        </div>
    );
};

// Prop types for the FileUpload component
FileUpload.propTypes = {
    onFileChange: PropTypes.func.isRequired,
    setErrorStatus: PropTypes.func.isRequired,
    setMsg: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default FileUpload;

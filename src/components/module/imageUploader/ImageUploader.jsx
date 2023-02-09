import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import styles from "./imageUploader.module.css";
import CollectionsIcon from '@mui/icons-material/Collections';
import ErrorMessage from "../../base/errorMessage/ErrorMessage";

const ImageUploader = ({ data, setData }) => {

    const maxNumber = 3;
    const maxSize = 100000;
    const [images, setImages] = useState([]);

    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex)
        setImages(imageList);

        // karena api tidak menyimpan data sebenarnya ke server maka image tidak di upload secara real disini
        // setData({ ...data, images: imageList })
    };

    return (
        <div className={`${styles.container}`}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                maxFileSize={maxSize}
                dataURLKey="data_url"
                acceptType={["jpg", "png"]}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <div className={`${styles.actionContainer}`}>
                            <button
                                className={`${styles.fileButton}`}
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <CollectionsIcon />
                                Click or Drop Image here
                            </button>
                            {errors
                                &&
                                <ErrorMessage
                                    text={
                                        errors.maxFileSize ?
                                            'File size max 100kb'
                                            : errors.maxNumber ?
                                                'File selected max 3'
                                                : errors.acceptType ?
                                                    'File format should be png or jpg' : ''
                                    }
                                />
                            }
                            {imageList && imageList.length > 0 &&
                                <button
                                    className={`${styles.removeButton}`}
                                    onClick={onImageRemoveAll}
                                >
                                    Remove all images
                                </button>
                            }
                        </div>
                        <div
                            className={`${styles.viewerContainer}`}
                        >
                            {imageList.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${styles.imagesViewer} image-item`}
                                >
                                    <img
                                        src={image.data_url}
                                        alt=""
                                    />
                                    <div
                                        className={`${styles.imageActions} image-item__btn-wrapper`}
                                    >
                                        <button onClick={() => onImageUpdate(index)}>Change</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default ImageUploader

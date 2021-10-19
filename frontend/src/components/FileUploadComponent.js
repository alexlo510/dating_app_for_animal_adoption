import React, {useState} from 'react';
import Axios from "axios"

export default function FileUploadComponent() {
    // add prop if need to pass things from parent to here, such as an id. 

    const [file, setFile] = useState('');
    // add more state if needed to add more data 

    const handleUpload = async (e) => {
        e.preventDefault()
        const data = new FormData()
        // append additional data here if needed
        data.append("file", file);
        try {
            const res = await Axios.post("https://httpbin.org/anything", data) // replace URL with server url
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleUpload}>
                <div>
                    <input type="file" accept="image/*" onChange={e => {
                        const file = e.target.files[0]
                        setFile(file)
                        }}
                    />
                    <button type="submit">Upload</button>
                </div>
            </form>
        </>
    );
}
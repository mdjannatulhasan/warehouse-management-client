import axios from "axios";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import app from "../../firebase.init";
import storage from "../../firebaseStorage";

const auth = getAuth(app);

const AddItem = () => {
    const [user, loading, error] = useAuthState(auth);
    const [progress, setProgress] = useState(0);
    const [fileUrl, setFileUrl] = useState("");

    const productNameRef = useRef("");
    const productPriceRef = useRef("");
    const productQuantityRef = useRef("");
    const productDescRef = useRef("");
    const productImageRef = useRef("");
    const supplierNemeRef = useRef("");
    const [imageAsFile, setImageAsFile] = useState("");

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile((imageFile) => image);
        console.log(imageAsFile);
    };
    const handleFireBaseUpload = async (event) => {
        event.preventDefault();
        console.log("start of upload");
        const timeDate = new Date().getTime();

        console.log(imageAsFile);
        const upImageRef = ref(storage, `images/${imageAsFile.name}`);

        const uploadTask = uploadBytesResumable(upImageRef, imageAsFile);
        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + prog + "% done");

                setProgress(prog);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileUrl(downloadURL);
                });
                console.log(fileUrl);

                console.log(fileUrl);
                handleSubmit(event);
            }
        );
    };

    const handleSubmit = (event) => {
        const product = {
            name: productNameRef.current.value,
            price: productPriceRef.current.value,
            quantity: productQuantityRef.current.value,
            desc: productDescRef.current.value,
            supplier: supplierNemeRef.current.value,
            email: user.email,
            image: productImageRef.current.value,
        };
        console.log(product);
        console.log(localStorage.getItem("accessToken"));
        const uploadProduct = async () => {
            console.log(localStorage.getItem("accessToken"));
            const { data } = await axios.post("http://localhost:3030/additem", product, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            console.log(localStorage.getItem("accessToken"));
            if (data.success) {
                toast.success("Product Added");
            } else {
                toast.error("Failed to add product");
            }
        };
        uploadProduct();
        productNameRef.current.value = "";
        productPriceRef.current.value = "";
        productQuantityRef.current.value = "";
        productDescRef.current.value = "";
        productImageRef.current.value = "";
        supplierNemeRef.current.value = "";
    };
    return (
        <div className="container">
            <div className="border p-8 mx-auto max-w-[600px] mt-9">
                <h1 className="text-4xl font-medium mb-9 text-center">Add Single Item</h1>

                <form onSubmit={handleFireBaseUpload} className="space-y-4">
                    <input className="border py-1 px-3 w-full" ref={productNameRef} type="text" placeholder="Product Name" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={productPriceRef} type="number" placeholder="Product Price" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={productQuantityRef} type="number" placeholder="Product Quantity" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={supplierNemeRef} type="text" placeholder="Supplier Name" required />
                    <br />
                    <textarea className="border py-1 px-3 w-full" ref={productDescRef} placeholder="Product Description"></textarea>
                    <br />
                    <input className="border py-1 px-3 w-full" ref={productImageRef} type="text" placeholder="Enter Image URL" required />
                    {/* <input className="py-1 w-full" ref={productImageRef} onChange={handleImageAsFile} type="file" required /> */}
                    {/* <br /> */}
                    {/* {imageAsFile ? <h3>Uploading {progress}%</h3> : ""} */}
                    <img src="" alt="" />
                    <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Add Product" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;

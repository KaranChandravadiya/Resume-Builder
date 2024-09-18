import React, { useRef } from 'react';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Created By Karan -16/09/2024 //
function PersonalDetailsForm({ mobile, setMobile, adharNumber, setAdharNumber, errors, photo, setPhoto }) {//Props Pass Child To Parent
    

    // Photo Upload Function Start*
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        reader.readAsDataURL(file);
    };
    // End*

    // Photo Remove Function Start*
    const fileInputRef = useRef(null); //Use By Photo Remove Clear File And ReUpload File
    const handlePhotoRemove = () => {
        setPhoto(null);
        fileInputRef.current.value = ''; // Clear the file input
    };
    //End*

    return (
        <>
            {/* Title Text */}
            <h3 style={{ backgroundColor: "#2196f3", padding: "10px", borderRadius: "20px", maxWidth: "400px", margin: "auto" }}>
                Add Your Personal Details
            </h3>

            {/* Mobile Number Input Field */}
            <TextField
                label="Mobile"
                type='tel'
                value={mobile}  //Input Value
                onChange={(e) => setMobile(e.target.value)} //onChange Input
                style={{ margin: "20px", minWidth: "900px" }}
                error={errors.mobile}   //Empty input validation error 
                helperText={errors.mobile ? "Invalid mobile number (10 digits required)" : ""} //Error show text
            />

            {/* AdharCard Number Input Field */}
            <TextField
                label="Aadhar Card Number"
                type='tel'
                value={adharNumber}   //Input Value
                onChange={(e) => setAdharNumber(e.target.value)} //onChange Input
                style={{ margin: "20px", minWidth: "900px" }}
                error={errors.adharNumber}    //Empty input validation error 
                helperText={errors.adharNumber ? "Invalid Aadhar number (12 digits required)" : ""} //Error show text
            />

            {/* Photo Upload Input Field */}
            <div style={{ margin: "20px" }}>
                <input
                    type="file"
                    onChange={handlePhotoUpload} //Photo Upload onChange
                    ref={fileInputRef} // Set the ref to the input
                    style={{ margin: "20px", minWidth: "900px" }}
                />
                {photo && (
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                        <img src={photo} alt="Preview" style={{ width: '100px', height: '100px' }} />
                        {/* Photo Remove onClick */}
                        <CloseIcon onClick={handlePhotoRemove} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' ,backgroundColor: "danger" }} />
                    </div>
                )}
            </div>
        </>
    );
}

export default PersonalDetailsForm;

import { Button, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'

// Created By Karan -13/09/2024 //
function BasicDetailsForm({ setFirstName, setLastName, setEmail, email, firstName, lastName, errors }) { //Props Pass Child To Parent

    return (
        <>
            {/* Title Text */}
            <h3 style={{ backgroundColor: "#2196f3", padding: "10px", borderRadius: "20px", maxWidth: "400px", margin: "auto" }}
            >Add Your Basic Details</h3>

            <FormControl>
                {/* First Name Input Field */}
                <TextField
                    label="First Name"
                    type='text'
                    value={firstName}   //Input Value
                    onChange={(e) => setFirstName(e.target.value)} //onChange Input
                    style={{ margin: "20px", minWidth: "900px" }}
                    error={errors.firstName}    //Empty input validation error 
                    helperText={errors.firstName ? "FirstName Must contain only letters required" : ""} //Error show text
                />

                {/* Last Name Input Field */}
                <TextField
                    label="Last Name"
                    type='text'
                    value={lastName}     //Input Value
                    onChange={(e) => setLastName(e.target.value)} //onChange Input
                    style={{ margin: "20px", minWidth: "900px" }}
                    error={errors.lastName}   //Empty input validation error
                    helperText={errors.lastName ? "LastName Must contain only letters required" : ""} //Error show text
                />

                {/* Email Input Field */}
                <TextField
                    label="Email"
                    type='email'
                    value={email}    //Input Value
                    onChange={(e) => setEmail(e.target.value)} //onChange Input
                    style={{ margin: "20px", minWidth: "900px" }}
                    error={errors.email}   //Empty input validation error
                    helperText={errors.email ? "Invalid email format" : ""} //Error show text
                />
            </FormControl>
        </>
    )
}

export default BasicDetailsForm
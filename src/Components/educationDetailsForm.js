import { Button, MenuItem, Select, Table, TableBody, TextField, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// Created By Karan -17/09/2024 //
function EducationDetailsForm({ inputs, setInputs }) { ////Props Pass Child To Parent
    // Dynamic Years dropdown input field Start*
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i);
    // End*

    const [error, setError] = useState(''); //Error handle state
    const [errorPop, setErrorPop] = useState(false); //OpenModal handle state

    // handleAddInput function
    const handleAddInput = () => {
        // Check if all fields are filled
        const allFilled = inputs.every(item => item.education && item.year && item.percentage);
        const validPercentage = inputs.every(item => {
            const percentage = parseFloat(item.percentage);
            return !item.percentage || (percentage >= 0 && percentage <= 100);
        });

        if (!allFilled) {
            setError('Please fill all fields before adding a new input.');
            setErrorPop(true);
        } else if (!validPercentage) {
            setError('Percentage must be a number between 0 and 100.');
            setErrorPop(true);
        } else {
            setError('');
            setInputs([...inputs, { education: "", year: "", percentage: "" }]);
        }
    };

    // handlePopBox Function
    const handlePopBox = () => {
        setErrorPop(false);
    };


    // handleChange function
    const handleChange = (event, index) => {
        // console.log(handleChange,"handleChange ====>>>");
        const { name, value } = event.target;
        const updatedInputs = [...inputs];
        updatedInputs[index][name] = value;
        setInputs(updatedInputs);
    };

    // handleDeleteInput Function
    const handleDeleteInput = (index) => {
        const updatedInputs = [...inputs];
        setInputs(updatedInputs.filter((_, i) => i !== index));
    };

    return (
        <>
            {/* Title text */}
            <h3 style={{ backgroundColor: "#2196f3", padding: "10px", borderRadius: "20px", maxWidth: "400px", margin: "auto" }}>
                Add Your Education Details
            </h3>

            <Table style={{ maxWidth: "900px", margin: "auto" }}>
                <thead>
                    {/* Input tile */}
                    <tr>
                        <th><h4>Education</h4></th>
                        <th><h4>Passing Year</h4></th>
                        <th><h4>Percentage %</h4></th>
                    </tr>
                </thead>
                <TableBody>
                    {/* Dynamically Add & Remove Multiple Input fields */}
                    {inputs.map((item, index) => (  
                        <tr key={index}>
                            <td>
                                <TextField
                                    label="Education"
                                    name="education"
                                    type='text'
                                    value={item.education} // education input value
                                    onChange={(event) => handleChange(event, index)} //onChange input value
                                    style={{ minWidth: "250px", margin: "4px" }}
                                />
                            </td>
                            <td>
                                <Select
                                    name="year"
                                    value={item.year} // year input value
                                    onChange={(event) => handleChange(event, index)} //onChange input value
                                    style={{ minWidth: "250px", margin: "4px" }}
                                // defaultValue="2024"
                                >
                                    {/* Dynamic Years */}
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                    {/* Static Years */}
                                    {/* <MenuItem value="2024">2024</MenuItem>
                                        <MenuItem value="2023">2023</MenuItem>
                                        <MenuItem value="2022">2022</MenuItem>
                                        <MenuItem value="2021">2021</MenuItem>
                                        <MenuItem value="2020">2020</MenuItem> */}
                                </Select>
                            </td>
                            <td>
                                <TextField
                                    label="Percentage %"
                                    name="percentage"
                                    type='tel'
                                    value={item.percentage} // percentage input value
                                    onChange={(event) => handleChange(event, index)} //onChange input value
                                    style={{ minWidth: "250px", margin: "4px" }}
                                />
                            </td>
                            <td>
                                {/* OnClick Delete Input Field  */}
                                {inputs.length > 1 && ( //Delete button should be shown if input length is more than one.
                                    <Button
                                        onClick={() => handleDeleteInput(index)}
                                        variant="outlined"
                                        style={{ backgroundColor: "", color: "#bb2d3b" }}
                                    >
                                        {/* Delete Icon */}
                                        <DeleteIcon />
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {/* OnClick Add Input Field  */}
                    <Button
                        onClick={() => handleAddInput()}
                        variant="outlined"
                        style={{ marginRight: "188px", marginTop: "10px", backgroundColor: "", color: "#157347" }}
                    >
                        {/* Add Icon*/}
                        <AddCircleOutlineIcon />
                    </Button>
                </TableBody>
            </Table>
            {/* Validation Error Show Open Model */}
            <Snackbar
                open={errorPop}
                autoHideDuration={2000}
                onClose={handlePopBox}
                message={error}
            >
                <Alert onClose={handlePopBox} severity="error">
                    {error}
                </Alert>
            </Snackbar>

        </>
    );
}

export default EducationDetailsForm;

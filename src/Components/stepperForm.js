import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicDetailsForm from './basicDetailsForm';
import PersonalDetailsForm from './personalDetailsForm';
import EducationDetailsForm from './educationDetailsForm';
import jsPDF from 'jspdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const steps = ['Basic Details', 'Personal Details', 'Education Details'];  //Stepper Form Steps UI Show 

// Created By Karan -17/09/2024 //
function StepperForm() {
    // child State 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [adharNumber, setAdharNumber] = useState('');
    const [photo, setPhoto] = useState('');
    const [inputs, setInputs] = useState([{ education: "", year: "", percentage: "" }])


    // Validation Error State
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        mobile: false,
        adharNumber: false,
        photo: false
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});



    // totalSteps function
    const totalSteps = () => {
        return steps.length;
    };

    // completedSteps function
    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    // isLastStep function
    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    // allStepsCompleted function
    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };


    //handleNext function
    const handleNext = () => {
        // Validate fields
        // Name for letters only (no numbers or special characters)
        const firstNameValidation = /^[A-Za-z]+$/;
        const lastNameValidation = /^[A-Za-z]+$/;
        // Basic email validation regex
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Regex for valid mobile number (10 digits)
        const mobileRegex = /^\d{10}$/;
        // Regex for valid Aadhar number (12 digits)
        const adharRegex = /^\d{12}$/;

        // Input error validation
        const newErrors = {
            firstName: !firstName ? 'Required' : !firstNameValidation.test(firstName) ? 'Must contain only letters' : '',
            lastName: !lastName ? 'Required' : !lastNameValidation.test(firstName) ? 'Must contain only letters' : '',
            email: !email ? 'Required' : !emailValidation.test(email) ? 'Invalid email format' : '',
            mobile: activeStep === 1 && (!mobile || !mobileRegex.test(mobile)) ? 'Invalid mobile number (10 digits required)' : '',
            adharNumber: activeStep === 1 && (!adharNumber || !adharRegex.test(adharNumber)) ? 'Invalid Aadhar number (12 digits required)' : '',
            photo: activeStep === 1 && !photo ? 'Required' : ''
        };

        setErrors(newErrors);

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (hasErrors) {
            // Do not proceed if there are errors
            console.log('Validation errors:', newErrors);
            return;
        }


        // Proceed to the next step only if there are no errors
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;

        setActiveStep(newActiveStep);

        console.log('Form submitted');
        // Place logic here for what should happen on successful submission
    };

    // handleBack Function
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //handleStep function
    const handleStep = (step) => () => {
        setActiveStep(step);
    };


    // PDF handleGenerate function
    function handleGenerate(e) {
        e.preventDefault();

        // Regex for letters only (no numbers or special characters)
        const firstNameValidation = /^[A-Za-z]+$/;
        const lastNameValidation = /^[A-Za-z]+$/;
        // Basic email validation regex
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        const newErrors = {
            firstName: !firstName ? 'Required' : !firstNameValidation.test(firstName) ? 'Must contain only letters' : '',
            lastName: !lastName ? 'Required' : !lastNameValidation.test(lastName) ? 'Must contain only letters' : '',
            email: !email ? 'Required' : !emailValidation.test(email) ? 'Invalid email format' : '',
        };

        setErrors(newErrors);

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (hasErrors) {
            // Do not proceed if there are errors
            console.log('Validation errors:', newErrors);
            return;
        }

        //Create a new jsPDF
        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text('RESUME BUILDER', 10, 20);
        doc.setFontSize(12);
        doc.setTextColor(50);

        // Add Basic Details if filled
        doc.setFontSize(16);
        doc.text('Basic Details', 10, 40);
        doc.setFontSize(12);
        if (firstName) {
            doc.text(`First Name: ${firstName}`, 10, 50);
        }
        if (lastName) {
            doc.text(`Last Name: ${lastName}`, 10, 60);
        }
        if (email) {
            doc.text(`Email: ${email}`, 10, 70);
        }

        // Add Personal Details if filled
        doc.setFontSize(16);
        doc.text('Personal Details', 10, 90);
        doc.setFontSize(12);
        if (mobile) {
            doc.text(`Mobile Number: ${mobile}`, 10, 100);
        }
        if (adharNumber) {
            doc.text(`Aadhaar Card Number: ${adharNumber}`, 10, 110);
        }
        if (photo) {
            doc.addImage(photo, 'JPEG', 150, 10, 50, 60);
        }

        // Set initial Y position for education details
        let yPosition = 130;
        doc.setFontSize(16);
        doc.text('Education', 10, yPosition);
        yPosition += 10;

        inputs.forEach((item, index) => {
            if (item.education || item.percentage || item.year) {
                doc.setFontSize(12);
                doc.text(`Education ${index + 1}: ${item.education || 'N/A'}`, 10, yPosition);
                doc.text(`Percentage ${index + 1}: ${item.percentage || 'N/A'}`, 10, yPosition + 10);
                doc.text(`Passing Year ${index + 1}: ${item.year || 'N/A'}`, 10, yPosition + 20);
                yPosition += 30; // Adjust spacing as needed
            }
        });

        // Save the PDF
        doc.save('Resume.pdf');
    }

    return (
        <>
            <Box sx={{ width: '70%', margin: "auto" }}>
                {/* Stepper active liner  */}
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            {/* First Step BasicDetailsForm */}
                            {activeStep === 0 && <BasicDetailsForm
                                firstName={firstName}  // Props Receive
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                email={email}
                                setEmail={setEmail}
                                errors={errors}
                            />}
                            {/* Second Step PersonalDetailsForm */}
                            {activeStep === 1 && <PersonalDetailsForm
                                mobile={mobile}  // Props Receive
                                setMobile={setMobile}
                                adharNumber={adharNumber}
                                setAdharNumber={setAdharNumber}
                                errors={errors}
                                photo={photo}
                                setPhoto={setPhoto}
                            />}
                            {/* Third Step EducationDetailsForm */}
                            {activeStep === 2 && <EducationDetailsForm
                                inputs={inputs} // Props Receive
                                setInputs={setInputs}
                                errors={errors}
                            />}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            {/* Stepper Form Back Button */}
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                style={{ marginLeft: "60px", color: "black" }}
                            >
                                <ArrowBackIcon />
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {/* Stepper Form PDF Generate Button */}
                            <Button onClick={handleGenerate} style={{ color: "black" }}>
                                <PictureAsPdfIcon />
                            </Button>
                            {/* Stepper Form Next Button */}
                            <Button on onClick={handleNext} disabled={activeStep === 2} style={{ marginRight: "60px", color: "black" }}>
                                <ArrowForwardIosSharpIcon />
                            </Button>
                        </Box>
                    </React.Fragment>
                </div>
            </Box>
        </>
    )
}

export default StepperForm


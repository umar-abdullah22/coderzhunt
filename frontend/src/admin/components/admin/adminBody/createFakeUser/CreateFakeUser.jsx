import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import styled from "./style.module.css"
import {
    resigterFakeUserAction
} from '../../../../../store/slices/fakeUser/actions';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

const mainHeading = {
    marginBottom: '10px',
};

const CreateFakeUser = () => {
    const [formData, setFormData] = useState({
        file: "",
        username: "",
        email: "",
        dob: "",
        postalcode: "",
        age: ""
    });
    const [relationship, setRelationship] = useState('SINGLE');
    const [childern, setChildren] = useState('Yes');
    const [gender, setGender] = useState('MALE');
    const [life, setLife] = useState('ALONE');
    const [smoker, setSmoker] = useState('YES');
    const updateFormData = (event) =>
        setFormData({
            ...formData,
            [event.target.name]: event.target.value

        });
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const { file, username, email, dob, postalcode, age } = formData;
    const payload = {
        userName: formData.username,
        creator: user.id,
        avatarUrl: formData.file,
        role: "FAKE",
        selfGender: gender,
        interestedGender: gender === "MALE" ? "FEMALE" : "MALE",
        relationshipStatus: relationship,
        life,
        smoker,
        children: childern,
        age: formData.age,
        dob: formData.dob,
        postalCode: postalcode,
        email: email
    }

    const handleChange = (e) => {
        e.preventDefault();
        dispatch(resigterFakeUserAction(payload))
            .then(unwrapResult)
            .then((result) => {
            })
            .catch((error) => {});

    }

    return (
        <div>
            <Typography variant='h6' sx={mainHeading}>
                Dashboard {'>'} Create Fake User
            </Typography>

            <div className={styled.createFakeUser}>
                <form>
                    <div className={`${styled.fromGroup} ${styled.fromGroupFull}`}>
                        <label>Avatar</label>
                        <input type="file" name="file" value={file} onChange={(e) => updateFormData(e)} />
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Username</label>
                        <input type="text" name="username" value={username} onChange={(e) => updateFormData(e)} />
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => updateFormData(e)} />
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Date of Birth</label>
                        <input type="date" name="dob" value={dob} onChange={(e) => updateFormData(e)} />
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>PostalCode</label>
                        <input type="text" name="postalcode" value={postalcode} onChange={(e) => updateFormData(e)} />
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Gender</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHERS">Others</option>
                        </select>
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Age</label>
                        <input type="text" name="age" value={age} onChange={(e) => updateFormData(e)} />
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Relationship Status</label>
                        {/* value={relationshipStatus} onChange={(event) => setRelationshipStatus(event.target.value)} */}
                        <select value={relationship} onChange={(e) => setRelationship(e.target.value)} >
                            <option value="SINGLE">Single</option>
                            <option value="IN_A_RELATIONSHIP">In a Relationship</option>
                            <option value="MARRIED">Married</option>
                            <option value="WIDOWED">Widowed</option>
                            <option value="DIVORCED">Divorced</option>
                            <option value="OPEN_RELATION">Open Relationship</option>
                            <option value="IT'S_COMPLICATED">It&apos;s complicated</option>
                        </select>
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Children</label>
                        <select value={childern} onChange={(e) => setChildren(e.target.value)}>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Life</label>
                        <select value={life} onChange={(e) => setLife(e.target.value)} >
                            <option value="ALONE">Alone</option>
                            <option value="AT_PARENTS">At parents</option>
                            <option value="FLAT_SHARE">Flat Share</option>
                            <option value="WITH_PARTNER">With partner</option>
                            <option value="MISCELLANEOUS">Miscellaneous</option>
                        </select>
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupHalf}`}>
                        <label>Smoker</label>
                        <select value={smoker} onChange={(e) => setSmoker(e.target.value)}>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                            <option value="STOPPED">Stoped</option>
                            <option value="OCCASIONALLY">Occasionally</option>
                        </select>
                    </div>
                    <div className={`${styled.fromGroup} ${styled.fromGroupFull}`}>
                        <button type="button" onClick={handleChange}>Submit</button>
                    </div>

                </form>
            </div>





        </div>
    )
}

export default CreateFakeUser
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Profile() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:4000/users/details", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.code === "USER-FOUND") {
                    setUserProfile(data.result);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: data.message,
                        icon: "error"
                    });
                }
                setIsLoading(false);
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong. Please try again later.",
                    icon: "error"
                });
                setIsLoading(false);
            });
    }, []);

    const handlePasswordUpdate = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: "Passwords don't match!",
                text: "Please make sure both password fields match.",
                icon: "error"
            });
            return;
        }

        const token = localStorage.getItem("token");

        fetch("http://localhost:4000/users/update-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                newPassword: newPassword,
                confirmPassword: confirmPassword
            })
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.code === "PASSWORD-UPDATE-SUCCESS") {
                    Swal.fire({
                        title: "Password Updated",
                        text: data.message,
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: data.message,
                        icon: "error"
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong. Please try again later.",
                    icon: "error"
                });
            });
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Profile Settings</h2>

            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Loading your profile...</p>
                </div>
            ) : (
                <>
                    <Card className="shadow mb-5 rounded">
                        <Card.Body>
                            <h3 className="mb-4">Your Information</h3>
                            {userProfile ? (
                                <>
                                    <p><strong>Name:</strong> {userProfile.firstName} {userProfile.middleName} {userProfile.lastName}</p>
                                    <p><strong>Email:</strong> {userProfile.email}</p>
                                    <p><strong>Contact Number:</strong> {userProfile.contactNumber}</p>
                                    <p className="text-muted">Welcome back, {userProfile.firstName}!</p>
                                </>
                            ) : (
                                <p className="text-danger">Unable to fetch profile details.</p>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className="shadow rounded bg-light">
                        <Card.Body>
                            <h3 className="mb-4">Update Password</h3>
                            <Form onSubmit={handlePasswordUpdate}>
                                <Form.Group className="mb-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    style={{ transition: "all 0.3s" }}
                                >
                                    Update Password
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            )}
        </Container>
    );
}

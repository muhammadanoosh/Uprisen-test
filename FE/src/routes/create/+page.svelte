<script>
    import axios from "axios";
    import { navigate } from "svelte-routing";

    let email = "";
    let name = "";
    let surname = "";
    let address = "";
    let phoneNumber = "";
    let date = "";

    const handleSubmit = async () => {
        const fileInput = document.getElementById("customFile");
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const formData = {
                email,
                name,
                surname,
                address,
                phoneNumber,
                date,
                attachment: reader.result,
            };
            console.log(formData);
            try {
                const token = localStorage.getItem("token");

                const response = await axios.post(
                    "http://localhost:5000/api/user/add-user",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    },
                );
                if (response) {
                    window.location.href = "/users";
                } else {
                    console.log(response);
                    // console.error("Failed to create user:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to submit data:", error);
            }
        };
    };

    let isEmailValid = true;

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isEmailValid = emailRegex.test(email);
    }
</script>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Create User form</h1>

            <form
                on:submit|preventDefault={handleSubmit}
                class="border rounded p-4"
            >
                <!-- Email -->
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        id="inputEmail"
                        bind:value={email}
                        on:input={validateEmail}
                        required
                    />
                    {#if !isEmailValid}
                        <div class="text-danger">
                            Please enter a valid email address.
                        </div>
                    {/if}
                </div>
                <!-- Name -->
                <!-- Name -->
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="inputName"
                        bind:value={name}
                        required
                    />
                </div>
                <!-- Surname -->
                <div class="mb-3">
                    <label for="inputSurname" class="form-label">Surname</label>
                    <input
                        type="text"
                        class="form-control"
                        id="inputSurname"
                        bind:value={surname}
                        required
                    />
                </div>
                <!-- Address -->
                <div class="mb-3">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input
                        type="text"
                        class="form-control"
                        id="inputAddress"
                        bind:value={address}
                    />
                </div>
                <!-- Phone Number -->
                <div class="mb-3">
                    <label for="inputPhoneNumber" class="form-label"
                        >Phone Number</label
                    >
                    <input
                        type="text"
                        class="form-control"
                        id="inputPhoneNumber"
                        bind:value={phoneNumber}
                    />
                </div>
                <!-- Date -->
                <div class="mb-3">
                    <label for="inputDate" class="form-label">Date</label>
                    <input
                        type="date"
                        class="form-control"
                        id="inputDate"
                        bind:value={date}
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="inputDate" class="form-label">Upload Attachment</label>
                    <br />
                    <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        accept=".pdf" 
                    />
                    <small id="fileHelp" class="form-text text-muted">Please upload a PDF file.</small>
                </div>
                
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Create</button
                    >
                </div>
            </form>
        </div>
    </div>
</div>

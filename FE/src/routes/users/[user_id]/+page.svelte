<script>
    import axios from "axios";

    export let data;
    let isEmailValid = true;
    
    let userId = data.user[0].user_id || "";
    let email = data.user[0].email || "";
    let name = data.user[0].first_name || "";
    let surname = data.user[0].last_name || "";
    let address = data.user[0].address || "";
    let phoneNumber = data.user[0].phone_number || "";
    let date = data.user[0].date_time || "";

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isEmailValid = emailRegex.test(email);
    }

    async function handleSubmit() {
        const formData = {
            id: userId,
            email,
            name,
            surname,
            address,
            phoneNumber,
            date,
        };

        console.log(formData);

        try {
            const response = await axios.put("http://localhost:5000/api/user/update-data",{ formData });

            if (response.ok) {
                alert("User data updated successfully");
            } else {
                alert("Failed to update user data");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("An error occurred while updating user data");
        }
    }
</script>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Edit form</h1>
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
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Create</button
                    >
                </div>
            </form>
        </div>
    </div>
</div>

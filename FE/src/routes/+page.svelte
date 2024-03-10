<script>
    import axios from "axios";
    import { navigate } from "svelte-routing";

    let email = "admin@admin.com";
    let password;

    

    const handleSubmit = async () => {
        const formData = {
            email,
            password,
        };
        console.log(formData);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/log-in",
                formData,
            );
            console.log(response);
            if (response.data.messege) {
                alert(response.data.messege);
                return;
            } else {
                const token = response.data;
                localStorage.setItem("token", token);
                window.location.href = "/create";
            }
        } catch (error) {
            console.error("Failed to submit data:", error);
        }
    };
</script>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Login form</h1>
            <form
                on:submit|preventDefault={handleSubmit}
                class="border rounded p-4"
            >
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label"
                        >Email</label
                    >
                    <div class="col-sm-10">
                        <input
                            type="text"
                            readonly
                            class="form-control-plaintext"
                            id="staticEmail"
                            bind:value={email}
                        />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label"
                        >Password</label
                    >
                    <div class="col-sm-10">
                        <input
                            type="password"
                            placeholder="Password (123456789) exported database is saved in the repo"
                            class="form-control"
                            id="inputPassword"
                            bind:value={password}
                        />
                    </div>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Log in</button
                    >
                </div>
            </form>
        </div>
    </div>
</div>

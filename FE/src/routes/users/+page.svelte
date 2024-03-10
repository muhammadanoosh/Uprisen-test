<script>
    import axios from "axios";

    export let data;
    const deleteUser = async (userId) => {
        const response = await axios.delete(
            `http://localhost:5000/api/user/delete-user?userId=${userId}`,
        );
        if (response) {
            window.location.href = "/create";
        }
    };

    import { onMount, onDestroy } from "svelte";

    const isTokenPresent = () =>
        typeof localStorage !== "undefined" &&
        localStorage.getItem("token") !== null;

    let hasToken = false; // Initialize hasToken to false initially
    const storageChangeHandler = () => {
        hasToken = isTokenPresent();
    };

    if (!import.meta.env.SSR) {
        window.addEventListener("storage", storageChangeHandler);
    }

    onDestroy(() => {
        if (!import.meta.env.SSR) {
            window.removeEventListener("storage", storageChangeHandler);
        }
    });

    onMount(() => {
        hasToken = isTokenPresent(); // Update hasToken when the component is mounted
    });
</script>

<div class="container mt-5">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <h2 class="mb-0">List of users</h2>

        {#if !hasToken}
        <button type="button" class="btn btn-secondary">
            <a class="text-white text-decoration-none" href="/"
            >Log in to edit data</a
            >
        </button>
        {/if}
    </div>
    <div class="table-responsive">
        <table class="table table-bordered shadow-sm">
            <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Number</th>
                    <th scope="col">Date</th>
                    {#if hasToken}
                        <th scope="col"></th>
                        <th scope="col"></th>
                    {/if}
                </tr>
            </thead>
            <tbody>
                {#each data.users as user}
                    <tr>
                        <td>{user.email}</td>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{user.address ? user.address : "N/A"}</td>
                        <td>{user.phone_number ? user.phone_number : "N/A"}</td>
                        <td>{user.date_time}</td>

                        {#if hasToken}
                            <td>
                                <button type="button" class="btn btn-secondary">
                                    <a
                                        class="text-white text-decoration-none"
                                        href={`../users/${user.user_id}`}
                                    >
                                        Edit
                                    </a>
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    on:click={() => deleteUser(user.user_id)}
                                    >Delete</button
                                >
                            </td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

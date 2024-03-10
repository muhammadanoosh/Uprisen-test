<script>
    import { onMount, onDestroy } from "svelte";

    const isTokenPresent = () =>
        typeof localStorage !== "undefined" &&
        localStorage.getItem("token") !== null;

    let hasToken = false; // Initialize hasToken to false initially

    const logOut = () => {
        localStorage.removeItem("token");
        if (!import.meta.env.SSR) {
            window.location.href = "/";
        }
    };

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

<header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <h2 class="navbar-brand">AIIT Test</h2>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul
                    class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                    style="--bs-scroll-height: 100px;"
                >
                    <!-- Conditionally show/hide "Log in" link based on token presence -->
                    {#if !hasToken}
                        <li class="nav-item">
                            <a class="nav-link" href="/">Log in</a>
                        </li>
                    {/if}
                    <li class="nav-item">
                        <a
                            class="nav-link active"
                            aria-current="page"
                            href="/users">User list</a
                        >
                    </li>
                    {#if hasToken}
                        <li class="nav-item">
                            <a class="nav-link" href="/create">Add user</a>
                        </li>
                    {/if}
                </ul>
            </div>
            <!-- Conditionally show/hide "Logout" button based on token presence -->
            {#if hasToken}
                <button type="button" class="btn btn-danger" on:click={logOut}
                    >Logout</button
                >
            {/if}
        </div>
    </nav>
</header>

<main>
    <slot />
</main>

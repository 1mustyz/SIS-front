<script>
    import FaHome from 'svelte-icons/fa/FaHome.svelte'
</script>

<main>
    <div class="logo">
        SMART ID
    </div>

    <div class="nav">
        <div class="link">
            <div class="icon">
                <FaHome/>
            </div>
            <p class="text">
                Dashboard
            </p>

        </div>

        <div class="link">
            <div class="icon">
                <FaHome/>
            </div>
            <p class="text">
                Profile
            </p>

        </div>

        <div class="link">
            <div class="icon">
                <FaHome/>
            </div>
            <p class="text">
                Add Student
            </p>

        </div>

        <div class="link">
            <div class="icon">
                <FaHome/>
            </div>
            <p class="text">
                View Student
            </p>

        </div>

        <div class="link">
            <div class="icon">
                <FaHome/>
            </div>
            <p class="text">
                Logout
            </p>

        </div>
    </div>
</main>

<style>
    .nav {
    }

    .link {
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items: center;
        padding: 1rem 1.7rem;

    }

    .icon {
        width: 20px;
        height: 20px;
        margin-right: 2.3rem;
        color: #7d8ba5;
    }

    main {
        width: 32%;
        padding: 1.7rem;
    }

    .logo {
        background-color: white;
        padding: 3rem 3rem;
        margin-bottom: 3rem;
        color: #3B76EF;
        border-radius: 10px;

    }

    .link:hover {
        background-color: white;
        color: black;
    }

    .link:hover > .text {
        color: #3B76EF;
    }
    
    .text {
        color: #7d8ba5;

    }
</style>
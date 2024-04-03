<script>
  import { FloatingLabelInput, Helper } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  // import mobileValidation from "../validation/mobileVerification";
  import loginVerification from "../validation/loginpasswordVerification";
  import { api } from "../api/api";
  let sendotp = false;
  let enterOtp = false;

  let user = {
    username: "",
    password: "",
  };

  let userErrors = {
    username: "",
    password: "",
  };
  let alertMsg = "";
  let res = loginVerification(user);
  const handleChange = (name) => {
    console.log("handleChange called for :", name);
    res = loginVerification(user, name);

    const keys = Object.keys(userErrors);

    keys.forEach((key) => {
      userErrors[key] = "";
    });

    res.errors.forEach((e) => {
      userErrors[e.fieldName] = e.message;
    });
  };
  const onSignIn = async () => {
    console.log("on sign in clicked -------------");
    alertMsg = "";

    if (res.hasErrors()) {
      alertMsg = "Kindly attend to errors above";
      res.errors.forEach((e) => {
        userErrors[e.fieldName] = e.message;
      });
      userErrors = userErrors;
      return;
    }
    {
      const { error, errorMsg, token } = await api.login({
        username: user.username,
        password: user.password,
      });
      console.log("token is --", token);
    }

    // if (error) {
    //   alertMsg = errorMsg;
    //   return;
    // }
    // goto("/admin");
  };
  let phoneNumber = "";
  let verificationCode = "";
  let verificationStatus = "";

  const sendCode = async () => {
    try {
      const response = await fetch("/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      console.log(data.message);
      // Handle success or error messages from the backend
    } catch (error) {
      console.error("Error sending verification code:", error);
      // Handle error
    }
  };
</script>

<form>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl border-b-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            HSC Result Admin
          </h1>
          <div>
            <div
              id="exampleWrapper"
              class="grid gap-6 items-end w-full md:grid-cols-1"
            >
              <div class="relative pb-4">
                <FloatingLabelInput
                  style="outlined"
                  id="floating_outlined"
                  name="floating_outlined"
                  type="text"
                  bind:value={user.username}
                  on:input={() => {
                    handleChange("username");
                  }}
                >
                  Result Publisher Name
                </FloatingLabelInput>
                {#if userErrors.username}
                  <Helper color="red" class="absolute">
                    {userErrors.username}
                  </Helper>
                {/if}
              </div>
            </div>
            <!-- <div>
            <button
              on:click={() => {
                sendotp = true;
              }}
              class="px-2 py-2 mt-2 rounded-lg text-white bg-primary-400"
              >Send OTP</button
            >
          </div> -->
          </div>
          <!-- {#if sendotp} -->
          <div
            id="exampleWrapper"
            class="grid gap-6 items-end w-full md:grid-cols-1"
          >
            <div class="relative pb-4">
              <FloatingLabelInput
                style="outlined"
                id="floating_outlined1"
                name="floating_outlined"
                type="password"
                bind:value={user.password}
                on:input={() => {
                  handleChange("password");
                }}
              >
                Password
              </FloatingLabelInput>
              {#if userErrors.password}
                <Helper color="red" class="absolute">
                  {userErrors.password}
                </Helper>
              {/if}
            </div>
          </div>
          <!-- {/if} -->

          <div class="flex justify-center items-center">
            <button
              type="submit"
              on:click={onSignIn}
              class="bg-primary-400 p-2 flex justify-center items-center text-white rounded-md px-8"
              >Sign in</button
            >
          </div>
          {#if alertMsg}
            <div
              class="flex mt-2 items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                {alertMsg}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</form>

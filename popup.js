document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("enableToggle");
    const settingsBtn = document.getElementById("settingsBtn");


    // Load saved setting

    chrome.storage.sync.get(
        {
            enabled: true
        },
        (data) => {

            toggle.checked = data.enabled;

        }
    );



    // Enable / Disable enhancer

    toggle.addEventListener("change", () => {


        const enabled = toggle.checked;


        chrome.storage.sync.set({

            enabled: enabled

        });



        // Send message to current tab

        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            (tabs) => {


                if (tabs[0]) {


                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        {
                            action: "toggleEnhancer",
                            enabled: enabled
                        }
                    );


                }


            }
        );


    });




    // Open settings page

    settingsBtn.addEventListener(
        "click",
        () => {


            chrome.runtime.openOptionsPage();


        }
    );


});
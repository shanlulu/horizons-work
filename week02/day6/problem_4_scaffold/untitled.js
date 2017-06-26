$.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/register", {
    method: "POST",
    data: {
        email: "dargani1234@gmail.com",
        password: "test",
        fname: "Darwish",
        lname: "Gani",
        birthYear: "91",
        birthMonth: "11",
        birthDay: "08"
    },
    success: function(resp, data) {
       	window.holder = resp;
       	window.dataholder = data;
    },
    error: function(error) {
        console.error(error.responseText);
    }
})
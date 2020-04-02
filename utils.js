module.exports = {
    age: function(timestamp) {

        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }

        return age
    },

    graduation: function(value) {
        switch(value) {
            case("medio"): return "Ensino Médio Completo"
            case("superior"): return "Ensino Superior Completo"
            case("mestrado"): return "Mestrado"
            case("doutorado"): return "Doutorado"
        }
    }     
}
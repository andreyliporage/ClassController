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
    },

    grade: function(value) {
        switch(value) {
            case("5EF"): return "5° ano Ensino Fundamental"
            case("6EF"): return "6° ano Ensino Fundamental"
            case("7EF"): return "7° ano Ensino Fundamental"
            case("8EF"): return "8° ano Ensino Fundamental"
            case("9EF"): return "9° ano Ensino Fundamental"
            case("1EM"): return "1° ano Ensino Médio"
            case("2EM"): return "2° ano Ensino Médio"
            case("3EM"): return "3° ano Ensino Médio"
        }
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) // month de 0 a 11
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`,
        }
    }
}
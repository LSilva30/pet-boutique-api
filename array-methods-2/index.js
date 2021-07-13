const bikes = [
    
    {   type: 'road',
        make: 'Trek',
        model: 'Diamonte',
        year: 2020,
    },
    {   type: 'road',
        make: 'Shimano',
        model: 'Diamond',
        year: 2019,
    },
    {   type: 'bmx',
        make: 'Ross',
        model: 'Smoker',
        year: 2021,
    },
    {   type: 'mountain',
        make: 'Trek',
        model: 'Backbuster',
        year: 2018,
    },
]

const newBikes = bikes.filter(bike => bike.year === 2021)
console.log(newBikes)

const trekBikes = bikes.filter(bike => bike.make === 'Trek')
console.log(trekBikes)

const trekBikes = bikes.find(bike => bike.make === 'Trek')
console.log(trekBikes)

const updatedBikes = bikes.map(bike => {
    return {
        category: bike.type, 
        brand: bike.make,
        model: bike.model,
        year: bike.year,
        used: bike.year < 2021,
    }
})

console.log(updatedBikes)
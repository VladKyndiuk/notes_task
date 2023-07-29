export function calculate(categoryName, list){
    let counter = 0;
    counter = list.reduce((total,el) => (el.category===categoryName ? total+1 : total), 0);
    return counter;
}
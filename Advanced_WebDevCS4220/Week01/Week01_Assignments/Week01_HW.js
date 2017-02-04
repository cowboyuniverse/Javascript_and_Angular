//console.log('--------------------------WEEK01 CS4220 YOSEPKIM----------------------')

//console.log('##### 1. Write a function that takes a string and reverses it.')
function reverseWord(string){
	let newString = ''
	for (let i = string.length-1; i > -1; --i){

		newString += string[i]
	}
	console.log(newString)
	return newString;

}

reverseWord('hello')
reverseWord('world')
console.log()

//console.log('##### 2. Write a function that takes a string and replaces all the vowels (a, e, i, o, u) with *')
function replaceVowels(string){
	let replaceVowelString = ''
	for(let i = 0; i < string.length; i++){
		if ((string[i] == 'a') || (string[i] == 'e') 
			|| (string[i] == 'i') || (string[i] == 'o') 
			|| (string[i] == 'u')){
			replaceVowelString += '*'	
		}
		replaceVowelString += string[i]
	}
	console.log(replaceVowelString)
	return replaceVowelString
}

replaceVowels('javascript') 
replaceVowels('angular')  
console.log()

//##### 3. Write a function that finds letters in the array and outputs their occurances as an object.  The key is the letter and the count is the value. (15 pts)



























// console.log('##### 2. Write a function that takes a string and replaces all the vowels (a, e, i, o, u) with *')











// console.log()
// //--------------------------------------------------------------------------------------------


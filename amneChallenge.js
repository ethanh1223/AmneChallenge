const fs = require('fs');

class PriceWindowFinder {

  constructor(file) {
    this.file = file;
    this.dataObj = {};
  }

  printOutput() {
    this.parseFile();
    this.findSolution();
  }

  findSolution() {
    for (var i = this.dataObj.k; i <= this.dataObj.n; i++) {
      const priceWindow = [];
      for (var j = i - this.dataObj.k; j < i; j++) {
        priceWindow.push(Number(this.dataObj.priceData[j]));
      }
      const increasingSubranges = this.findSubranges(priceWindow, 'increasing');
      const decreasingSubranges = this.findSubranges(priceWindow, 'decreasing');
      console.log(increasingSubranges - decreasingSubranges);
    }
  }

  parseFile(file) {
    const dataString = '' + fs.readFileSync(this.file, 'utf8'); 

    const dataArray = dataString.split('\n');
    dataArray[0] = dataArray[0].split(' ');

    this.dataObj.n = dataArray[0][0];
    this.dataObj.k = dataArray[0][1];
    this.dataObj.priceData = dataArray[1].split(' ');
  }

  findSubranges(priceWindow, type) {
    var count = 0;

    if (type === 'increasing') {
      for (var i = 0; i < priceWindow.length; i++) {
        count += this.DFS(priceWindow, i, 'increasing');
      }
    } else {
      for (var i = 0; i < priceWindow.length; i++) {
        count += this.DFS(priceWindow, i, 'decreasing');
      }
    }

    return count;
  }

  DFS(priceWindow, i, type, localCount) {
    var localCount = localCount || 0;

    if ((type === 'increasing') && (i + 1 === priceWindow.length || priceWindow[i + 1] <= priceWindow[i])) {
      return localCount; 
    } 

    else if (type === 'decreasing' && (i + 1 === priceWindow.length || priceWindow[i + 1] >= priceWindow[i])) {
      return localCount; 
    }

    else {
      localCount ++;
      return this.DFS(priceWindow, i + 1, type, localCount);
    }
  }
}


const test = new PriceWindowFinder('./data.txt');

test.printOutput();

var makeData = function() {
  var length = 9;
  var string = `${length} 4 \n`
  for (var i = 0; i <= length; i++) {
    price = Math.floor(Math.random() * 10);
    string += price + ' ';
  }
  console.log(string)
  fs.writeFileSync('./data.txt', string , 'utf8');
}

// makeData()

// fs.writeFileSync('./data.txt', '' , 'utf8');



/* 
For this problem, you are given N days of average home sale price data, and a fixed window size K . 
For each window of K days, from left to right, find the number of increasing subranges within the window 
minus the number of decreasing subranges within the window.

A window of days is defined as a contiguous range of days. Thus, there are exactly N-K+1 windows where this metric needs to be computed. An increasing subrange is defined as a contiguous range of indices [a,b], a < b , where each element is larger than the previous element. A decreasing subrange is similarly defined, except each element is smaller than the next.
Constraints

1 ≤ N ≤ 200,000 days
1 ≤ K ≤ N days
Input Format

Your solution should accept an input file (input.txt) with the following contents: 

 Line 1: Two integers, N and K.
 Line 2: N positive integers of average home sale price, each less than 1,000,000.
Output Format

Your solution should output one integer for each window’s result, with each integer on a separate line, to an output file or to the console.

Sample Input

5 3
188930 194123 201345 154243 154243
Sample Output

3
0
-1
Explanation

For the first window of [188930, 194123, 201345], there are 3 increasing subranges ([188930, 194123, 201345], [188930, 194123], and [194123, 201345]) and 0 decreasing, so the answer is 3. For the second window of [194123, 201345, 154243], there is 1 increasing subrange and 1 decreasing, so the answer is 0. For the third window of [201345, 154243, 154243], there is 1 decreasing subrange and 0 increasing, so the answer is -1.
Performance

Your solution should run in less than 30 seconds and use less than 50MB of memory with a valid input of any size (within the given constraints).

*/ 
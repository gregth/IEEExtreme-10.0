function calc_page(address, s) {
    return Math.floor(address / s);
}

function processData(input) {

    //Split input lines
    var lines = input.split('\n');
    var testcases = parseInt(lines[0]);
    lines.shift();
    //Foreach testcase
    for (var i = 0; i < testcases; ++i) {
        
        //Parse testcase data
        var data = lines[0].split(' ');
        lines.shift();
        var pages = data[0];
        var size = data[1];
        var number = data[2];

        //Calculate input page calls
        var page_calls = [];
        for (var j = 0; j < number; ++j) {
            line = lines[0];
            lines.shift();
            address = parseInt(line);
            page_calls[j] = calc_page(address, size);
        }
    
        //Implement FIFO
        var queue = [];
        var fifo_counter = 0;    
        //Iterate for each application page call
        for (var j = 0; j < page_calls.length; ++j) {
            var element = page_calls[j];
            if (queue.indexOf(element) <  0) {

                //Implementing enque 
                if (queue.length == pages) {
                    queue.shift();
                    queue.push(element);
                    fifo_counter++;
                }
                else {
                    queue.push(element);
                }
            }
        }
        
        //Implementing LRU
        var list = [];
        var lru_counter = 0;
        //Iterate for each application page call
        for (var j = 0; j < page_calls.length; ++j) {
            var element = page_calls[j];
            if (list[0] != element) {
                if (list.indexOf(element) >= 0) {
                    //Element included in list
                    var updated_list;
                    //Copy array tranfering the element at first position
                    k = list.indexOf(element);
                    var list1 = list.slice(0, k);
                    var list2 = list.slice(k+1, list.length);
                    var list0 = [element];
                    list = (list0.concat(list1)).concat(list2);
                }
                else {
                    //Element not yet included
                    if (list.length == pages) {
                        list.unshift(element);
                        list.pop();
                        lru_counter++;
                    }
                    else {
                        list.unshift(element);
                    }
                }
            }
        }
        if (fifo_counter > lru_counter) {
            console.log('yes ' + fifo_counter + ' ' + lru_counter);
        }
        else {
            console.log('no ' + fifo_counter + ' ' + lru_counter);
        }
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

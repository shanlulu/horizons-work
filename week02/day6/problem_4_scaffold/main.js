var times = [ {start: 0, end: 500}, {start: 0, end: 200}, {start: 200, end: 500}, {start: 600, end: 700} ];

times = times.sort(function(a,b){ a.start - b.start });


// first make collision buckets
var buckets = {}


var bucketCount = 0;
var lastEnd = 0;
for(var i = 0; i < times.length-1; i++){
	// debugger;
	var j = 1;
	
	buckets[bucketCount] = buckets[bucketCount] || [];
	if(times[i].start > lastEnd){
		bucketCount++;
	}
	if(buckets[bucketCount] == -1){
		buckets[bucketCount].push(times[i]);
	}

	var nextTime = times[i+j];
	var jump = false;
	while(nextTime.start < times[i].end){
		buckets[bucketCount].push(nextTime);
		nextTime = times[i + (++j)]
	}
	lastEnd = times[i].end;
}
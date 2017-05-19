/**
 * Created by BreakPoint on 19.05.17.
 */

links = sendRecive(gateway);

function getContent(next) {
    lenCurrent = links.length;
    var elem0 = $($('.image')[0]);
    var elem1 = $($('.image')[1]);

    if (next) {
        if (currentImg == lenCurrent - 1) {
            currentImg = 0;
            elem1.attr('src', links[currentImg]);
        } else {
            currentImg += 1;
            elem1.attr('src', links[currentImg]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
        elem1.insertBefore(elem0);
    } else {
        if (currentImg == 0) {
            currentImg = lenCurrent - 1;
            elem1.attr('src', links[currentImg]);
        } else {
            currentImg -= 1;
            elem1.attr('src', links[currentImg]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
        elem0.insertAfter(elem1);
    }

}
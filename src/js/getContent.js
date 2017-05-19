/**
 * Created by BreakPoint on 19.05.17.
 */

links = sendRecive(gateway);

function getContent(next) {
    lenCurrent = links.length;

    if (next) {
        if (currentImg == lenCurrent - 1) {
            currentImg = 0;
            $('.container').html(links[currentImg]);
        } else {
            currentImg += 1;
            $('.container').html(links[currentImg]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
    } else {
        if (currentImg == 0) {
            currentImg = lenCurrent - 1;
            $('.container').html(links[currentImg]);
        } else {
            currentImg -= 1;
            $('.container').html(links[currentImg]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
    }

}
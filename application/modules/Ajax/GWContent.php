<?php
/**
 * Created by PhpStorm.
 * User: BreakPoint
 * Date: 20.05.17
 * Time: 11:59
 */

//namespace modules\Ajax;


require_once $_SERVER['DOCUMENT_ROOT'].'/vars.inc.php';
require_once $_SERVER['DOCUMENT_ROOT']."/netcat/connect_io.php";
require_once $SYSTEM_FOLDER.'nc_core.class.php';

class GWContent
{
    //Приватные поля
    private $fileName = '';
//    private $workType = '';
//    private $clients = '';
//    private $contentType = '';
    private $getDB = array();
    private $jsonEncode = array();
    private $debug= false;
    private $status = false;
//    private $workTypeA = array();
//    private $clientsA = array();
//    private $contentTypeA = array();

    //Публичные поля
    public $message = '';

    //Конструктор
    public function __construct($contentJson, $debug = false) { //$workTypeJson, $clientsJson, $contentTypeJson,

        $this->debug = $debug;

        // initialize superior system object
        $nc_core_db = nc_Core::get_object();
        // load default extensions
        $nc_core_db->init();

        $this->fileName = $_SERVER['DOCUMENT_ROOT']."/modules/".$contentJson.".json";
//        $this->workType = $_SERVER['DOCUMENT_ROOT']."/modules/".$workTypeJson.".json";
//        $this->clients = $_SERVER['DOCUMENT_ROOT']."/modules/".$clientsJson.".json";
//        $this->contentType = $_SERVER['DOCUMENT_ROOT']."/modules/".$contentTypeJson.".json";

        try {
            $nc_core_db->db->query("SELECT  typeEN, clientEN, content, animation, class, view, contentHTML, page, Keyword FROM Message113 WHERE checked", ARRAY_A);
            $this->getDB = $nc_core_db->db->last_result;
            $this->status = true;
            $this->checkStatus('Запрос к базе');
        }
        catch (Exception $e) {
            $this->status = false;
            $this->checkStatus('Запрос к базе', '', $e->getMessage());
        }

        foreach ($this->getDB as $key => $param) {
            $link = array();
            //print_r($link);
            if (empty($param['Keyword'])) {
                if ($param['view'] == 'background') {
                    preg_match('#img\/lg\/.*#i', $param['content'], $link);
                    $jsonVal = $this->jsonEncode[$param['page']][$param['typeEN']][strtolower(str_replace(' ', '-', $param['clientEN']))][] = "<div class='" . $param['class'] . " " . $param['animation'] . "' style='background:url(/netcat_files/" . $link[0] . ")' data-client='".strtolower(str_replace(' ', '-', $param['clientEN']))."' data-type='".$param['typeEN']."'></div><div class='header' data-client='".$param['clientEN']."'></div><div class='subheader' data-type='".$param['typeEN']."'></div>";
                }
                else {
                    $jsonVal = $this->jsonEncode[$param['page']][$param['typeEN']][strtolower(str_replace(' ', '-', $param['clientEN']))][] = "<div data-client='".strtolower(str_replace(' ', '-', $param['clientEN']))."' data-type='".$param['typeEN']."'>" . $param['contentHTML'] . "</div>";
                }
            } else {
                if ($param['view'] == 'background') {
                    preg_match('#img\/lg\/.*#i', $param['content'], $link);
                    $jsonVal = $this->jsonEncode[$param['page']][$param['typeEN']][strtolower(str_replace(' ', '-', $param['clientEN']))][$param['Keyword']] = "<div class='" . $param['class'] . " " . $param['animation'] . "' style='background:url(/netcat_files/" . $link[0] . ")' data-client='".strtolower(str_replace(' ', '-', $param['clientEN']))."' data-type='".$param['typeEN']."'></div><div class='header' data-client='".$param['clientEN']."'></div><div class='subheader' data-type='".$param['typeEN']."'></div>";
                }
                else {
                    $jsonVal = $this->jsonEncode[$param['page']][$param['typeEN']][strtolower(str_replace(' ', '-', $param['clientEN']))][$param['Keyword']] = "<div data-client='".strtolower(str_replace(' ', '-', $param['clientEN']))."' data-type='".$param['typeEN']."'>" . $param['contentHTML'] . "</div>";
                }
            }

//            $this->workTypeA[] = $param['typeEN'];
//            $this->clientsA[] = strtolower(str_replace(' ', '-', $param['clientEN']));
//            $this->contentTypeA[] = $param['typeContent'];

            $this->display_debug(array($jsonVal), $this->debug);

        }

    }

    //Приватная функция для отображения статуса операции
    private function checkStatus($operation, $end='', $error='') {
        if ($this->status) {
            return $operation." выполнен".$end." успешно!</br>";
        }
        else {
            return $operation." не выполнен".$end."  Скорее всего причина в: ".$error."</br>";
        }
    }

    //Приватная функция дебага
    private function display_debug (array $dkeys, $debug) {

        if ($debug >= 1) {
            echo "<pre>";
            foreach ($dkeys as $dkey) {
                echo "<hr>";
                //print_r($tmpval = key($dkey) ? key($dkey) : "");
                if (is_array($dkey)) {
                    print_r($dkey);
                }
                else {
                    print_r(htmlspecialchars($dkey));
                }
                if ($debug == 2) {
                    if (is_array($dkey)) {
                        foreach ($dkey as $key) {
                            echo "<hr>";
                            print_r($key);
                        }
                    }
                    else {
                        echo htmlspecialchars($dkey);
                    }
                }
                if (empty($dkey)) {
                    echo "Value is Empty";
                    echo "<br />";
                }
                if (is_null($dkey)) {
                    echo "  <------- Value is Null";
                    echo "<br />";
                }
                if (is_array($dkey)) {
                    echo "^-------------------------- Value is Array";
                    echo "<br />";
                }
                if (is_string($dkey)) {
                    echo "  <------ Value is String";
                    echo "<br />";
                }
            }
            echo "</pre>";

            if ($debug > 1) {
                echo "<h1>Debug level 2, backtrace</h1>";
                echo "<pre>";
                var_dump(debug_backtrace());
                echo "</pre>";
                echo "<h1>End Debug level 2, backtrace</h1>";
            }
        }
    }

    //Публичная функция добавления новго объекта
    public function addObject($keyword, $type='', $company='', $content='', $class='image', $classAnim='default', $view='background') {

        if ($view == 'background') {
            $addVal = $this->jsonEncode[$type][$company][$keyword] = "<div class='".$class." ".$classAnim."' style='background:url(".$content.")' data-client='".$company."' data-type='".$type."'></div><div class='header' data-client='".$company."'></div><div class='subheader' data-type='".$type."'></div>";
        }
        else  {
            $addVal = $this->jsonEncode[$type][$company][$keyword] = "<div data-client='".$company."' data-type='".$type."'>" . $content . "</div>";
        }

        $this->display_debug(array($addVal), $this->debug);
        $this->display_debug(array($this->jsonEncode), $this->debug);

        $this->status = true;
        $this->message = $this->checkStatus('Добавление объекта', 'о');


    }

    //Публичная функция удаления объекта
    public function removeObject($type='', $company='', $content='', $class='image', $classAnim='default', $view='background') {

        if ($view == 'background') {
            $tempKey = array_search("<div class='".$class." ".$classAnim."' style='background:url(".$content.")' data-client='".$company."' data-type='".$type."'></div><div class='header' data-client='".$company."'></div><div class='subheader' data-type='".$type."'></div>", $this->jsonEncode[$type][$company]);
            $this->display_debug(array($tempKey), $this->debug);
            unset($this->jsonEncode[$type][$company][$tempKey]);
        }
        else {
            $tempKey = array_search("<div data-client='".$company."' data-type='".$type."'>".$content."</div>", $this->jsonEncode[$type][$company]);
            $this->display_debug(array($tempKey), $this->debug);
            unset($this->jsonEncode[$type][$company][$tempKey]);
        }

        $this->status = true;
        $this->message = $this->checkStatus('Удаление объекта', 'о');


    }

    //Публичная функция записи всего массива в файла
    public function writeFiles() {

        try {
//            $this->workTypeA = array_unique($this->workTypeA);
//            $this->clientsA = array_unique($this->clientsA);
//            $this->contentTypeA = array_unique($this->contentTypeA);
//
            $this->jsonEncode = json_encode($this->jsonEncode, JSON_UNESCAPED_UNICODE);
//            $this->workTypeA = json_encode($this->workTypeA, JSON_UNESCAPED_UNICODE);
//            $this->clientsA = json_encode($this->clientsA, JSON_UNESCAPED_UNICODE);
//            $this->contentTypeA = json_encode($this->contentTypeA, JSON_UNESCAPED_UNICODE);

            $fileTemp = fopen($this->fileName, 'w');
            $this->status = fwrite($fileTemp, $this->jsonEncode);
            fclose($fileTemp);

//            $fileTemp = fopen($this->workType, 'w');
//            $this->status = fwrite($fileTemp, $this->workTypeA);
//            fclose($fileTemp);
//
//            $fileTemp = fopen($this->clients, 'w');
//            $this->status = fwrite($fileTemp, $this->clientsA);
//            fclose($fileTemp);
//
//            $fileTemp = fopen($this->contentType, 'w');
//            $this->status = fwrite($fileTemp, $this->contentTypeA);
//            fclose($fileTemp);

            $this->message = $this->checkStatus('Создание файлов', 'о');
        }
        catch (Exception $e) {
            $this->status = false;
            $this->checkStatus('Создание файлов', 'о', $e->getMessage());
        }


    }


}
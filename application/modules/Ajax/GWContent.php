<?php
/**
 * Created by PhpStorm.
 * User: BreakPoint
 * Date: 20.05.17
 * Time: 11:59
 */

namespace modules\Ajax;


require_once $_SERVER['DOCUMENT_ROOT'].'/vars.inc.php';
require_once $_SERVER['DOCUMENT_ROOT']."/netcat/connect_io.php";
require_once $SYSTEM_FOLDER.'nc_core.class.php';

class GWContent
{
    //Приватные поля
    private $fileName = '';
    private $getDB = array();
    private $jsonEncode = array();
    private $debug= false;
    private $status = false;

    //Публичные поля
    public $message = '';

    //Конструктор
    public function __construct($debug = false) {

        $this->debug = $debug;

        // initialize superior system object
        $nc_core_db = nc_Core::get_object();
        // load default extensions
        $nc_core_db->init();

        $this->fileName = $_SERVER['DOCUMENT_ROOT']."/modules/content.json";

        try {
            $nc_core_db->db->query("SELECT  typeEN, clientEN, content, animation, class, typeContent FROM Message113", ARRAY_A);
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
            if ($param['typeContent'] == 'block') {
                preg_match('#img\/lg\/.*#i', $param['content'], $link);
                $jsonVal = $this->jsonEncode[$param['typeEN']][$param['clientEN']]['block'][] = "<div class='" . $param['class'] . " " . $param['animation'] . "' style='background:url(/netcat_files/" . $link[0] . ")'></div>";
            }
            else if ($param['typeContent'] == 'text') {
                $jsonVal = $this->jsonEncode[$param['typeEN']][$param['clientEN']]['text'][] = "<div class='" . $param['class'] . " " . $param['animation'] . "'>" . $param['content'] . "</div>";
            }

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
    public function addObject($type='', $company='', $content='', $class='image', $classAnim='default', $typeContent='block') {

        if ($typeContent == 'block') {
            $addVal = $this->jsonEncode[$type][$company][$typeContent][] = "<div class='".$class." ".$classAnim."' style='background:url(".$content.")'></div>";
        }
        else if ($typeContent == 'text') {
            $addVal = $this->jsonEncode[$type][$company]['text'][] = "<div class='" . $class . " " . $classAnim . "'>" . $content . "</div>";
        }

        $this->display_debug(array($addVal), $this->debug);
        $this->display_debug(array($this->jsonEncode), $this->debug);

        $this->status = true;
        $this->message = $this->checkStatus('Добавление объекта', 'о');


    }

    //Публичная функция удаления объекта
    public function removeObject($type='', $company='', $content='', $class='image', $classAnim='default', $typeContent='block') {

        if ($typeContent == 'block') {
            $tempKey = array_search("<div class='".$class." ".$classAnim."' style='background:url(".$content.")'></div>", $this->jsonEncode[$type][$company][$typeContent]);
            $this->display_debug(array($tempKey), $this->debug);
            unset($this->jsonEncode[$type][$company][$typeContent][$tempKey]);
        }
        else if ($typeContent == 'text') {
            $tempKey = array_search("<div class='".$class." ".$classAnim."'>".$content."</div>", $this->jsonEncode[$type][$company]['text']);
            $this->display_debug(array($tempKey), $this->debug);
            unset($this->jsonEncode[$type][$company]['text'][$tempKey]);
        }

        $this->status = true;
        $this->message = $this->checkStatus('Удаление объекта', 'о');


    }

    //Публичная функция записи всего массива в файла
    public function writeFiles() {

        $this->jsonEncode = json_encode($this->jsonEncode, JSON_UNESCAPED_UNICODE);
        $fileTemp = fopen($this->fileName, 'w');
        $this->status = fwrite($fileTemp, $this->jsonEncode);
        fclose($fileTemp);

        $this->status = true;
        $this->message = $this->checkStatus('Запись в файл', 'а');

    }


}
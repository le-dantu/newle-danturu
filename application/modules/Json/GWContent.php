<?php
/**
 * Created by PhpStorm.
 * User: BreakPoint
 * Date: 20.05.17
 * Time: 11:59
 */

require_once $_SERVER['DOCUMENT_ROOT'].'/vars.inc.php';
require_once $_SERVER['DOCUMENT_ROOT']."/netcat/connect_io.php";

ini_set('display_errors');

namespace modules\Json;


class GWContent
{
    //Константы
    const FILE_NAME = $_SERVER['DOCUMENT_ROOT']."/modules/content.json";
    //const SECTIONS = 5;
    //const DATATYPES = 13;

    //Публичные поля
    private $getDB = array();
    private $jsonEncode = array();
    //private $newObject = array();
    private $status = false;

    //Конструктор
    public function __construct($debug = false) {

        try {
            $nc_core->db->query("SELECT  typeEN, clientEN, imageLg FROM Message113", ARRAY_A);
            $this->getDB = $nc_core->db->last_result;
            $this->status = true;
            $this->checkStatus('Запрос к базе');
        }
        catch ($e) {
            $this->status = false;
            $this->checkStatus('Запрос к базе', '', $e->getMessage());
        }

        foreach ($this->getDB as $key => $param) {
            $link = array();
            preg_match('#img\/lg\/.*#i', $param['imageLg'], $link);
            //print_r($link);
            $this->jsonEncode[$param['typeEN']][$param['clientEN']]["block"][] = "<div class='image default' style='background:url(/netcat_files/".$link[0].")'></div>";
        }

    }

    //Приватная функция для отображения статуса операции
    private function checkStatus($operation, $end='', $error='') {
        if ($this->status) {
            return $operation." выполнен".$end." успешно!";
        }
        else {
            return $operation." не выполнен".$end."  Скорее всего причина в: ".$error;
        }
    }

    //Приватная функция дебага
    private function display_debug (array $dkeys, $debug) {

        if ($debug >= 1) {
            echo "<pre>";
            foreach ($dkeys as $dkey) {
                echo "<hr>";
                $tmpval = key($dkey) ? key($dkey) : "";
                print_r($dkey);
                if ($debug == 2) {
                    if (is_array($dkey)) {
                        foreach ($dkey as $key) {
                            echo "<hr>";
                            print_r($key);
                        }
                    }
                }
            }
            echo "</pre>";

            if ($debug > 1) {

            }
        }
    }

    //Публичная функция добавления новго объекта
    public function addObject($type='', $company='', $content='', $class='image', $classAnim='default', $typeContent='block') {

        if ($typeContent != 'text') {
            $this->jsonEncode[$type][$company][$typeContent][] = "<div class='".$class." ".$classAnim."' style='background:url(".$content.")'></div>";
        }
        else {
            $this->jsonEncode[$type][$company]['text'][] = "<div class='".$class." ".$classAnim."'>".$content."</div>";
        }

        $this->status = true;
        $this->checkStatus('Добавление объекта', 'о');

        $this->display_debug($this->jsonEncode, 1);

    }

    //Публичная функция удаления объекта
    public function removeObject($type='', $company='', $content='', $class='image', $classAnim='default', $typeContent='block') {

        if ($typeContent != 'text') {
            $tempKey = array_search("<div class='".$class." ".$classAnim."' style='background:url(".$content.")'></div>", $this->jsonEncode[$type][$company][$typeContent]);
            unset($this->jsonEncode[$type][$company][$typeContent][$tempKey]);
        }
        else {
            $tempKey = array_search("<div class='".$class." ".$classAnim."'>".$content."</div>", $this->jsonEncode[$type][$company]['text']);
            unset($this->jsonEncode[$type][$company]['text'][$tempKey]);
        }

        $this->status = true;
        $this->checkStatus('Удаление объекта', 'о');

    }

    //Публичная функция записи всего массива в файла
    public function writeFiles() {

        $this->jsonEncode = json_encode($this->jsonEncode, JSON_UNESCAPED_UNICODE);
        $fileTemp = fopen(FILE_NAME, 'w');
        $this->status = fwrite($fileTemp, $this->jsonEncode);
        fclose($fileTemp);

        $this->status = true;
        $this->checkStatus('Запись в файл', 'а');

    }


}

$temp = new GWContent();
$temp->addObject('Design', 'Pomegranate', 'le-dantu.ru');
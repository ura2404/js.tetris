<?php
use \cmKernel as kernel;
use \cmWeb as web;

class MyModel extends kernel\Mvc\Model{

	function getData(){
        return [
            'form' =>web\Ide\Form::get('cmWeb/custom/games/tetris')->Path,
            'res' => web\Ide\Resource::get('vendor')->Path
        ];
	}
}
?>
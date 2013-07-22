<?php

//Page
//stuff that helps generate pages

class Page {

	private $title;

	public function __construct($title) {
		$this->title = $title;
	}
	
	public function getTitle() {
		return $this->title;
	}
	
	public function getHeader($title) {
		$s =  '<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
	<title>Pilgrim';
	
	if ( strlen($title) > 0 ) {
		$s .= ' [' . $title . ']';
	}
	
	$s .= '</title>
	<!-- <meta name="description" content=""> -->
	<!-- <meta name="keywords" content="Add,your,site,keywords,here"> -->
	
	<!-- js -->
	<script type="text/javascript" src="' . $this->getPathToBase() . '/js/jquery.min.js"></script>
	<!--[if lt IE 9]>
	<script src="js/html5shiv.js"></script>
	<![endif]-->
	<script type="text/javascript" src="' . $this->getPathToBase() . '/js/pilgrim.js"></script>
	<script type="text/javascript" src="' . $this->getPathToBase() . '/js/' . $this->getShortName() . '.js"></script>
	
	<!-- css -->
	<link href="' . $this->getPathToBase() . '/css/pure.css" rel="stylesheet" type="text/css">
	<link href="' . $this->getPathToBase() . '/css/pilgrim.css" rel="stylesheet" type="text/css">
	<link href="' . $this->getPathToBase() . '/css/' . $this->getShortName() . '.css" rel="stylesheet" type="text/css">
	
</head>
';
	}
	
}

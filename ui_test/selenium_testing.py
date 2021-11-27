import pytest
from seleniumbase import BaseCase as sb
import os
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import ElementNotVisibleException, WebDriverException
import pickle

#---------------------------------------------------SETTINGS------------------------------------------------------------
host="http://localhost:3000/"
#-----------------------------------------------------------------------------------------------------------------------

@pytest.mark.parametrize("account, name, amount, sender" ,
[
    ("11", "Hrishikesh", "1000", "12")
])
def test_searchWithButton(sb, account, name, amount, sender):
    # print(host)
    sb.open("http://localhost:3000/admin/transfer")
    sb.maximize_window()

    sb.find_element("//input[@placeholder='Account Number']",By.XPATH).send_keys(account)
    sb.find_element("//input[@placeholder='Name']",By.XPATH).send_keys(name)
    sb.find_element("//input[@placeholder='Amount']",By.XPATH).send_keys(amount)
    sb.find_element("//input[@placeholder='Sender']",By.XPATH).send_keys(sender)

    sb.find_element("Transfer", By.LINK_TEXT).click()
    assert True

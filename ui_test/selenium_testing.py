import pytest
from seleniumbase import BaseCase as sb
import os
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import ElementNotVisibleException, WebDriverException
import pickle
import time

#---------------------------------------------------SETTINGS------------------------------------------------------------
host="http://localhost:3000/"
#-----------------------------------------------------------------------------------------------------------------------

@pytest.mark.parametrize("account, name, amount, sender" ,
[
    ("11", "Hrishikesh Lamdade", "1000", "12"),
    ("12", "Pranav Kumar", "100000", "11")
])
def test_Transfer(sb, account, name, amount, sender):
    # print(host)
    sb.open("http://localhost:3000/admin/transfer")
    sb.maximize_window()

    sb.find_element("//input[@placeholder='Account Number']",By.XPATH).send_keys(account)
    sb.find_element("//input[@placeholder='Name']",By.XPATH).send_keys(name)
    sb.find_element("//input[@placeholder='Amount']",By.XPATH).send_keys(amount)
    sb.find_element("//input[@placeholder='Sender']",By.XPATH).send_keys(sender)

    try:
        sb.find_element("pk", By.ID).click()
        time.sleep(5)
        assert True
    except:
        assert False


@pytest.mark.parametrize("name, address, amount, loantype" ,
[
    ("Pranav Kumar", "11", "99999", "Car"),
    ("Gokul Ramanan", "123", "1000", "Home")
])
def test_Loan(sb,name, address, amount, loantype):
    # print(host)
    sb.open("http://localhost:3000/admin/loan")
    sb.maximize_window()
    sb.find_element("//input[@placeholder='Name']",By.XPATH).send_keys(name)
    sb.find_element("//input[@placeholder='Address']",By.XPATH).send_keys(address)
    sb.find_element("//input[@placeholder='Amount']",By.XPATH).send_keys(amount)
    # sb.find_element("demo-controlled-open-select", By.ID).click()
    # sb.find_element("demo-controlled-open-select",By.ID).send_keys(loantype)
    sb.find_element(f"//select[@name='loantype']/option[text()='{loantype}']", By.XPATH).click()
    sb.find_element( "//input[@type='file']",By.XPATH,).send_keys(os.path.abspath("aiml_exp5.pdf"))
    
    try:
        sb.find_element("laonSubmit", By.ID).click()
        time.sleep(5)
        assert True
    except:
        assert False

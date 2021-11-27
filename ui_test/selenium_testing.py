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

# @pytest.mark.parametrize([])
def test_searchWithButton(sb):
    # print(host)
    sb.open("http://localhost:3000/")
    sb.maximize_window()    

    # driver = webdriver.Chrome(executable_path="/home/pranav/Desktop/SE Project/ui_test/chromedriver")
    # driver.open("http://localhost:3000/")
    # driver.maximize_window()

    # try:
    #     if sb.find_element("Account Me Out", By.LINK_TEXT):
    #         assert True
    #     else:
    #         assert False
    # except:
    #     assert False

    # try:
    #     nav_link = sb.find_element("fa fa-suitcase text-black", By.CLASS_NAME).text
    #     # nav_link.click()
    #     assert True
    # except:
    #     assert False
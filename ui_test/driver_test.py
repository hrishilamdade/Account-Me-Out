from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())
# to maximize the browser window
driver.maximize_window()
#get method to launch the URL
driver.get("http://localhost:3000/")
#to refresh the browser
driver.refresh()
# identifying the link with the help of link text locator
driver.find_element_by_id("Apply For Loan").click()
#to close the browser
# driver.close()
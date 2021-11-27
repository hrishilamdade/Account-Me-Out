from selenium import webdriver
#browser exposes an executable file
#Through Selenium test we will invoke the executable file which will then #invoke #actual browser
driver = webdriver.Chrome(executable_path="/home/pranav/Desktop/SE Project/ui_test/chromedriver")
# to maximize the browser window
driver.maximize_window()
#get method to launch the URL
driver.get("http://localhost:3000/")
#to refresh the browser
driver.refresh()
# identifying the link with the help of link text locator
driver.find_element_by_link_text("Apply").click()
#to close the browser
driver.close()
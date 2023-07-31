import time
from telnetlib import EC

import pytest
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait


# @pytest.fixture
def test_integration():
    service = Service("../driver/chromedriver.exe")
    driver = webdriver.Chrome(service=service)
    driver.maximize_window()
    driver.get("http://127.0.0.1:8000/")
    username_field = driver.find_element(By.ID, "input-login-username")
    username_field.send_keys("loan")
    password_field = driver.find_element(By.ID, "input-login-password")
    password_field.send_keys("adminpoc2023")
    login_button = driver.find_element(By.ID, "button-action")
    login_button.click()
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "username_portal")))
    assert driver.find_element(By.ID, "username_portal").text == "Login as loan"
    add_button = driver.find_element(By.ID, "btn-add")
    add_button.click()

    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "addlink")))
    name = driver.find_element(By.ID, "name")
    name.send_keys("New Name")
    environment = driver.find_element(By.ID, "environment")
    environment.send_keys("New Environment")
    link = driver.find_element(By.ID, "link")
    strNewLink = "https://" + str(time.time_ns()) + ".com"
    link.send_keys(strNewLink)
    project = driver.find_element(By.ID, "project")
    project.send_keys("New Project")
    description = driver.find_element(By.ID, "description")
    description.send_keys("New Description")
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "submitAddLink")))
    submit_btn = driver.find_element(By.ID, "submitAddLink")
    submit_btn.click()
    search_value = driver.find_element(By.ID, "search-value")
    search_value.send_keys(strNewLink)
    search_btn = driver.find_element(By.ID, "search-btn")
    search_btn.click()
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[@id='table_body_links']//a")))
    actual_name = driver.find_element(By.XPATH, "//*[@id='table_body_links']//td[1]")
    actual_env = driver.find_element(By.XPATH, "//*[@id='table_body_links']//td[2]")
    actual_link = driver.find_element(By.XPATH, "//*[@id='table_body_links']//a")
    actual_project = driver.find_element(By.XPATH, "//*[@id='table_body_links']//td[4]")
    actual_des = driver.find_element(By.XPATH, "//*[@id='table_body_links']//td[5]")
    actual_created_by = driver.find_element(By.XPATH, "//*[@id='table_body_links']//td[6]")
    assert actual_name.text == "New Name" \
           and actual_env.text == "New Environment" \
           and actual_link.text == strNewLink \
           and actual_project.text == "New Project" \
           and actual_des.text == "New Description" \
           and actual_created_by.text == "loan"
    print("actual link", actual_link.text)
    print("expected link", strNewLink)

    delete_btn = driver.find_element(By.ID, "deleteLink")
    delete_btn.click()
    alert = driver.switch_to.alert
    if alert:
        print(alert.text)
    alert.accept()

    if __name__ == "__main__":
        pytest.main()

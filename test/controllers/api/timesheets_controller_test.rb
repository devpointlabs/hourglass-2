require 'test_helper'

class Api::TimesheetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_timesheets_index_url
    assert_response :success
  end

  test "should get show" do
    get api_timesheets_show_url
    assert_response :success
  end

  test "should get create" do
    get api_timesheets_create_url
    assert_response :success
  end

  test "should get update" do
    get api_timesheets_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_timesheets_destroy_url
    assert_response :success
  end

end

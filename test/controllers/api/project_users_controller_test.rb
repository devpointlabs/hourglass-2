require 'test_helper'

class Api::ProjectUsersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_project_users_index_url
    assert_response :success
  end

  test "should get update" do
    get api_project_users_update_url
    assert_response :success
  end

end

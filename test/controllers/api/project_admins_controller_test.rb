require 'test_helper'

class Api::ProjectAdminsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_project_admins_index_url
    assert_response :success
  end

  test "should get update" do
    get api_project_admins_update_url
    assert_response :success
  end

end

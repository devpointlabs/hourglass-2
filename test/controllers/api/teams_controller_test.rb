require 'test_helper'

class Api::TeamsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_teams_index_url
    assert_response :success
  end

  test "should get create" do
    get api_teams_create_url
    assert_response :success
  end

  test "should get update" do
    get api_teams_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_teams_destroy_url
    assert_response :success
  end

end

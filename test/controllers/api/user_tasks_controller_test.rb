require 'test_helper'

class Api::UserTasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_user_tasks_index_url
    assert_response :success
  end

end

class Api::TimesheetsController < ApplicationController
  before_action :authenticate_user!
	before_action :set_timesheet, only: [:show, :update, :destroy]

	def index
		render json: current_user.timesheets.all
  end

	def show
		render json: @timesheet.get_array
  end

	def create
		timesheet = current_user.timesheets.new(DateTime.now)
		
		if timesheet.set_sessions(params[:total_minutes], params[:task_id])
			render json: timesheet
		else
			render json: timesheet.errors, status: 422
		end
  end

	def update
		if @timesheet.update(timesheet_params)
			render json: @timesheet.id
		else
			render json: @timesheet.errors, status: 422
		end
  end

	def destroy
		if @timesheet.timesheet_admins.includes(current_user.id)
			@timesheet.destroy
		else
			render status: 401
		end
	end
	
	private 
		def set_timesheet
			@timesheet = Timesheet.find(params[:id])
		end
end

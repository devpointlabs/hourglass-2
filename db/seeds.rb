
a = User.create(
  email:'admin@hourglass.com',
	password: 'password',
	first_name: Faker::Name.first_name,
	last_name: Faker::Name.last_name,
	nickname: Faker::Creature::Animal.name
)
a1 = User.create(
  email:'admin1@hourglass.com',
	password: 'password',
	first_name: Faker::Name.first_name,
	last_name: Faker::Name.last_name,
	nickname: Faker::Creature::Animal.name
)

admins = [a, a1]
User.create(
  email:'standard@hourglass.com',
	password: 'password',
	first_name: Faker::Name.first_name,
	last_name: Faker::Name.last_name,
	nickname: Faker::Creature::Animal.name
)
random_users = []

7.times do
	random_users.push(User.all.sample.id)
	p random_users
end

random_users = random_users.clean

i = 0
5.times do 
	random_admin = admins.sample.id
	users = random_users - [random_users.sample] + [random_admin];
	users = users.clean
	project = Project.create(
		title: "Project#{i}",
		description: "This is a project test",
		client_name: "Me Foo",
		planned_start: DateTime.now,
		planned_end: nil,
		budget: (1000.00 * rand(12)).round(2),
		complete: false,
		spent: (500.25 * rand(25)).round(2),
		cost: (30.18 * rand(100)).round(2),
		project_admins: [random_admin],
		all_users: users
	)
	3.times do 
		task = project.tasks.create(
			title: Faker::Job.title,
			description: Faker::Job.field,
			complete: false
		)
		2.times do 
			now = Time.now 
			s=Session.create(
				task_id: task.id, 
				user_id: a.id, 
				start_time: DateTime.parse((now - (rand(1..14) * 24 * 60 * 60)).to_s),
				total_minutes: rand(60...240)
			)
			puts s.id, s.start_time
		end
	end

	User.all.each do |u|
		if project.all_users.include?(u.id)
			u.update(projects: u.projects.push(project.id))
		end
	end
	i+=1
end

puts "Test Projects Seeded!"

